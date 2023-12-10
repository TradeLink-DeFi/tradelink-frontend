"use client";
import { Modal, ModalBody, ModalContent, Spinner } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

interface LoadingModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  message: string;
}

export const LoadingModal = (props: LoadingModalProps) => {
  return (
    <Modal
      isDismissable={false}
      hideCloseButton={true}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <ModalContent>
        {() => (
          <>
            <ModalBody className="py-8 flex flex-col items-center gap-8 w-full">
              <p>{props.message}</p>
              <Spinner size="lg" color="primary" />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
