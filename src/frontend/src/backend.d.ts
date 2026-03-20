import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ProductInput {
    stockQuantity: bigint;
    featured: boolean;
    name: string;
    description: string;
    specs: ProductSpecs;
    imageUrl: string;
    category: ProductCategory;
    brand: string;
    price: bigint;
}
export type Time = bigint;
export interface ProductUpdate {
    stockQuantity?: bigint;
    featured?: boolean;
    name?: string;
    description?: string;
    specs?: ProductSpecs;
    imageUrl?: string;
    category?: ProductCategory;
    brand?: string;
    price?: bigint;
}
export interface BookingInput {
    customerName: string;
    serviceType: ServiceType;
    productId?: bigint;
    email: string;
    preferredTimeSlot: string;
    preferredDate: Time;
    notes: string;
    phone: string;
}
export interface BookingUpdate {
    status?: BookingStatus;
    notes?: string;
}
export interface ProductSpecs {
    ram: bigint;
    storage: bigint;
    display: string;
    processor: string;
}
export interface Booking {
    id: bigint;
    customerName: string;
    status: BookingStatus;
    serviceType: ServiceType;
    productId?: bigint;
    email: string;
    preferredTimeSlot: string;
    preferredDate: Time;
    notes: string;
    phone: string;
}
export interface CartItem {
    productId: bigint;
    quantity: bigint;
}
export interface Product {
    id: bigint;
    stockQuantity: bigint;
    featured: boolean;
    name: string;
    description: string;
    specs: ProductSpecs;
    imageUrl: string;
    category: ProductCategory;
    brand: string;
    price: bigint;
}
export interface UserProfile {
    name: string;
}
export enum BookingStatus {
    cancelled = "cancelled",
    pending = "pending",
    confirmed = "confirmed"
}
export enum ProductCategory {
    gaming = "gaming",
    business = "business",
    student = "student",
    general = "general"
}
export enum ServiceType {
    repair = "repair",
    demo = "demo",
    consultation = "consultation"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(input: ProductInput): Promise<bigint>;
    addToCart(productId: bigint, quantity: bigint): Promise<boolean>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearCart(): Promise<boolean>;
    confirmBooking(bookingId: bigint): Promise<boolean>;
    createBooking(input: BookingInput): Promise<bigint>;
    editProduct(productId: bigint, update: ProductUpdate): Promise<boolean>;
    getAllProducts(): Promise<Array<Product>>;
    getAvailableTimeSlots(_date: Time): Promise<Array<string>>;
    getBooking(bookingId: bigint): Promise<Booking | null>;
    getBookingsByEmail(email: string): Promise<Array<Booking>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCart(): Promise<Array<CartItem>>;
    getProduct(productId: bigint): Promise<Product | null>;
    getProductsByCategory(category: ProductCategory): Promise<Array<Product>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    removeFromCart(productId: bigint): Promise<boolean>;
    removeProduct(productId: bigint): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchProductsByName(searchTerm: string): Promise<Array<Product>>;
    updateBooking(bookingId: bigint, update: BookingUpdate): Promise<boolean>;
}
