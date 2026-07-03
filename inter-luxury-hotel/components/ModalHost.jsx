"use client";

import AuthModal from "./AuthModal";
import BookRoomModal from "./BookRoomModal";
import CartDrawer from "./CartDrawer";
import CheckoutModal from "./CheckoutModal";
import SuccessModal from "./SuccessModal";

export default function ModalHost() {
  return (
    <>
      <AuthModal />
      <BookRoomModal />
      <CartDrawer />
      <CheckoutModal />
      <SuccessModal />
    </>
  );
}
