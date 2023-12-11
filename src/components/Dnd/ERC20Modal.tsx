"use client";
import { TokenItem } from "@/interfaces/item.interface";
import { useTokens } from "@/services/token.service";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";

interface ERC20ModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  selectedChain: string;
  handleAddToken: (
    token: TokenItem,
    amount: string
  ) => void;
}

export const ERC20Modal = (props: ERC20ModalProps) => {
  const {
    data: tokenList,
    isLoading,
    error,
  } = useTokens(props.selectedChain ?? "11155111");

  const [selected, SetSelected] = useState<string>(
    tokenList ? tokenList[0]?.symbol : ""
  );
  const [amount, SetAmount] = useState<string>();
  const [selectedToken, SetSelectedToken] = useState<TokenItem>();

  useEffect(() => {
    if (tokenList) {
      const token = tokenList?.filter(
        (item: TokenItem) => item.symbol == selected
      )[0];
      if (token) {
        SetSelectedToken(token);
      } else {
        SetSelectedToken(tokenList[0]);
      }
    }
  }, [selected, tokenList]);

  const handleAddToken = async () => {
    if (selectedToken != undefined && amount) {
      props.handleAddToken(selectedToken, amount);
      handleClose();
    }
  };

  const handleClose = () => {
    SetAmount("");
    SetSelectedToken(tokenList[0]);
    props.onOpenChange();
  };

  return (
    <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add ERC20 Token
            </ModalHeader>
            <ModalBody>
              <Select
                size="sm"
                placeholder="Select ERC20 Token"
                defaultSelectedKeys={[tokenList[0].symbol]}
                disallowEmptySelection
                variant="bordered"
                classNames={{
                  base: ["w-[400px]"],
                  label: "font-semibold text-sm text-[#000211]",
                  trigger: ["border", "bg-white"],
                }}
                aria-label="Select ERC20 Token"
                label=""
                onChange={(e) => {
                  SetSelected(e.target.value);
                }}
              >
                {tokenList?.map((item: any) => (
                  <SelectItem key={item.symbol} value={item.symbol}>
                    {item.symbol}
                  </SelectItem>
                ))}
              </Select>
              <Input
                size="sm"
                type="number"
                aria-label="Input amount"
                placeholder="Input amount"
                variant="bordered"
                classNames={{
                  innerWrapper: "bg-transparent",
                  inputWrapper: ["border", "bg-white"],
                }}
                onChange={(e) => SetAmount(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={() => handleClose()}
                color="danger"
                variant="light"
              >
                Close
              </Button>
              <Button
                disabled={!selectedToken || !amount}
                onClick={() => handleAddToken()}
                color="primary"
                className="disabled:bg-primary-200"
              >
                Add
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
