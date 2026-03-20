import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Types
  type BookingStatus = {
    #pending;
    #confirmed;
    #cancelled;
  };

  type ServiceType = {
    #demo;
    #repair;
    #consultation;
  };

  public type ProductCategory = {
    #gaming;
    #business;
    #student;
    #general;
  };

  public type ProductSpecs = {
    ram : Nat;
    storage : Nat;
    processor : Text;
    display : Text;
  };

  public type Product = {
    id : Nat;
    name : Text;
    brand : Text;
    category : ProductCategory;
    price : Nat;
    specs : ProductSpecs;
    stockQuantity : Nat;
    description : Text;
    imageUrl : Text;
    featured : Bool;
  };

  public type Booking = {
    id : Nat;
    customerName : Text;
    email : Text;
    phone : Text;
    productId : ?Nat;
    preferredDate : Time.Time;
    preferredTimeSlot : Text;
    serviceType : ServiceType;
    status : BookingStatus;
    notes : Text;
  };

  public type CartItem = {
    productId : Nat;
    quantity : Nat;
  };

  public type ShoppingCart = {
    items : [CartItem];
  };

  public type ProductInput = {
    name : Text;
    brand : Text;
    category : ProductCategory;
    price : Nat;
    specs : ProductSpecs;
    stockQuantity : Nat;
    description : Text;
    imageUrl : Text;
    featured : Bool;
  };

  public type BookingInput = {
    customerName : Text;
    email : Text;
    phone : Text;
    productId : ?Nat;
    preferredDate : Time.Time;
    preferredTimeSlot : Text;
    serviceType : ServiceType;
    notes : Text;
  };

  public type ProductUpdate = {
    name : ?Text;
    brand : ?Text;
    category : ?ProductCategory;
    price : ?Nat;
    specs : ?ProductSpecs;
    stockQuantity : ?Nat;
    description : ?Text;
    imageUrl : ?Text;
    featured : ?Bool;
  };

  public type BookingUpdate = {
    status : ?BookingStatus;
    notes : ?Text;
  };

  public type UserProfile = {
    name : Text;
  };

  // Storage
  let products = Map.empty<Nat, Product>();
  let shoppingCarts = Map.empty<Principal, List.List<CartItem>>();
  let bookings = Map.empty<Nat, Booking>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  var nextProductId = 1;
  var nextBookingId = 1;

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Product Management (Admin)
  public shared ({ caller }) func addProduct(input : ProductInput) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };

    let product : Product = {
      id = nextProductId;
      name = input.name;
      brand = input.brand;
      category = input.category;
      price = input.price;
      specs = input.specs;
      stockQuantity = input.stockQuantity;
      description = input.description;
      imageUrl = input.imageUrl;
      featured = input.featured;
    };

    products.add(nextProductId, product);
    nextProductId += 1;
    nextProductId - 1;
  };

  public shared ({ caller }) func editProduct(productId : Nat, update : ProductUpdate) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can edit products");
    };

    switch (products.get(productId)) {
      case (null) { false };
      case (?existingProduct) {
        let updatedProduct : Product = {
          id = existingProduct.id;
          name = switch (update.name) { case (null) { existingProduct.name }; case (?v) { v } };
          brand = switch (update.brand) { case (null) { existingProduct.brand }; case (?v) { v } };
          category = switch (update.category) { case (null) { existingProduct.category }; case (?v) { v } };
          price = switch (update.price) { case (null) { existingProduct.price }; case (?v) { v } };
          specs = switch (update.specs) { case (null) { existingProduct.specs }; case (?v) { v } };
          stockQuantity = switch (update.stockQuantity) { case (null) { existingProduct.stockQuantity }; case (?v) { v } };
          description = switch (update.description) { case (null) { existingProduct.description }; case (?v) { v } };
          imageUrl = switch (update.imageUrl) { case (null) { existingProduct.imageUrl }; case (?v) { v } };
          featured = switch (update.featured) { case (null) { existingProduct.featured }; case (?v) { v } };
        };
        products.add(productId, updatedProduct);
        true;
      };
    };
  };

  public shared ({ caller }) func removeProduct(productId : Nat) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can remove products");
    };

    if (products.containsKey(productId)) {
      products.remove(productId);
      true;
    } else {
      false;
    };
  };

  // Booking Management (Admin)
  public shared ({ caller }) func updateBooking(bookingId : Nat, update : BookingUpdate) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update bookings");
    };

    switch (bookings.get(bookingId)) {
      case (null) { false };
      case (?existingBooking) {
        let updatedBooking : Booking = {
          id = existingBooking.id;
          customerName = existingBooking.customerName;
          email = existingBooking.email;
          phone = existingBooking.phone;
          productId = existingBooking.productId;
          preferredDate = existingBooking.preferredDate;
          preferredTimeSlot = existingBooking.preferredTimeSlot;
          serviceType = existingBooking.serviceType;
          status = switch (update.status) {
            case (null) { existingBooking.status };
            case (?v) { v };
          };
          notes = switch (update.notes) { case (null) { existingBooking.notes }; case (?v) { v } };
        };
        bookings.add(bookingId, updatedBooking);
        true;
      };
    };
  };

  public shared ({ caller }) func confirmBooking(bookingId : Nat) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can confirm bookings");
    };

    switch (bookings.get(bookingId)) {
      case (null) { false };
      case (?existingBooking) {
        let updatedBooking : Booking = {
          id = existingBooking.id;
          customerName = existingBooking.customerName;
          email = existingBooking.email;
          phone = existingBooking.phone;
          productId = existingBooking.productId;
          preferredDate = existingBooking.preferredDate;
          preferredTimeSlot = existingBooking.preferredTimeSlot;
          serviceType = existingBooking.serviceType;
          status = #confirmed;
          notes = existingBooking.notes;
        };
        bookings.add(bookingId, updatedBooking);
        true;
      };
    };
  };

  // Public Queries (No authentication required)
  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  public query ({ caller }) func getProduct(productId : Nat) : async ?Product {
    products.get(productId);
  };

  public query ({ caller }) func getProductsByCategory(category : ProductCategory) : async [Product] {
    products.values().toArray().filter(
      func(product) { product.category == category }
    );
  };

  public query ({ caller }) func searchProductsByName(searchTerm : Text) : async [Product] {
    products.values().toArray().filter(
      func(product) {
        product.name.contains(#text searchTerm);
      }
    );
  };

  // Shopping Cart (User-only)
  public shared ({ caller }) func addToCart(productId : Nat, quantity : Nat) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add items to cart");
    };

    switch (products.get(productId)) {
      case (null) { false };
      case (?_) {
        let cartItems = switch (shoppingCarts.get(caller)) {
          case (null) { List.empty<CartItem>() };
          case (?items) { items };
        };

        var found = false;

        let updatedItems = cartItems.map<CartItem, CartItem>(
          func(item) {
            if (item.productId == productId) {
              found := true;
              {
                productId = item.productId;
                quantity = item.quantity + quantity;
              };
            } else {
              item;
            };
          }
        );

        if (not found) {
          updatedItems.add({ productId; quantity });
        };

        shoppingCarts.add(caller, updatedItems);
        true;
      };
    };
  };

  public shared ({ caller }) func removeFromCart(productId : Nat) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can remove items from cart");
    };

    switch (shoppingCarts.get(caller)) {
      case (null) { false };
      case (?cartItems) {
        let filteredItems = cartItems.filter(
          func(item) { item.productId != productId }
        );
        shoppingCarts.add(caller, filteredItems);
        true;
      };
    };
  };

  public shared ({ caller }) func clearCart() : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can clear cart");
    };

    shoppingCarts.remove(caller);
    true;
  };

  public query ({ caller }) func getCart() : async [CartItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view cart");
    };

    switch (shoppingCarts.get(caller)) {
      case (null) { [] };
      case (?cartItems) { cartItems.toArray() };
    };
  };

  // Bookings (Public can create, Admin can view all)
  public shared ({ caller }) func createBooking(input : BookingInput) : async Nat {
    // Public can create bookings without authentication
    let booking : Booking = {
      id = nextBookingId;
      customerName = input.customerName;
      email = input.email;
      phone = input.phone;
      productId = input.productId;
      preferredDate = input.preferredDate;
      preferredTimeSlot = input.preferredTimeSlot;
      serviceType = input.serviceType;
      status = #pending;
      notes = input.notes;
    };

    bookings.add(nextBookingId, booking);
    nextBookingId += 1;
    nextBookingId - 1;
  };

  public query ({ caller }) func getBooking(bookingId : Nat) : async ?Booking {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view bookings");
    };
    bookings.get(bookingId);
  };

  public query ({ caller }) func getBookingsByEmail(email : Text) : async [Booking] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view bookings");
    };
    bookings.values().toArray().filter(
      func(booking) { booking.email == email }
    );
  };

  public query ({ caller }) func getAvailableTimeSlots(_date : Time.Time) : async [Text] {
    // Public can view available time slots
    ["10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"];
  };
};
