import * as React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "./Button";
import { useConnect, useAccount } from "wagmi";
export interface IWalletConnectModalProps {}
const useIsMounted = () => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return mounted;
};
export function WalletConnectModal(props: IWalletConnectModalProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const isMounted = useIsMounted();
  const [
    {
      data: { connector, connectors },
      error,
      loading,
    },
    connect,
  ] = useConnect();
  const [
    { data: account, error: accountError, loading: accountLoading },
    disconnect,
  ] = useAccount();
  function handleModal() {
    setIsOpen((state) => !state);
  }
  function handleConnect() {
    if (!accountLoading && account?.address) {
      disconnect();
    } else {
      handleModal();
    }
  }
  return (
    <>
      <Transition show={isOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={setIsOpen}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="flex justify-between items-center">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-extrabold text-gray-900"
                  >
                    connect Wallet
                  </Dialog.Title>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="mt-8 flex flex-col space-y-2">
                  {connectors.map((x) => (
                    <Button
                      type="button"
                      disabled={isMounted && !x.ready}
                      key={x.name}
                      onClick={() => {
                        setIsOpen(false);
                        connect(x);
                      }}
                    >
                      {x.id === "injected"
                        ? isMounted
                          ? x.name
                          : x.id
                        : x.name}
                      {isMounted && !x.ready && " (unsupported)"}
                      {loading && x.name === connector?.name && "…"}
                    </Button>
                  ))}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <Button onClick={handleConnect}>
        {!accountLoading && account?.address
          ? "Disconnect wallet"
          : "Connect wallet"}
      </Button>
    </>
  );
}
