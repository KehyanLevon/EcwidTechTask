export {};

declare global {
  interface Window {
    Ecwid?: {
      OnAPILoaded: { add: (cb: () => void) => void };
      OnPageLoaded: { add: (cb: (page: { type: string }) => void) => void };
      openPage: (page: string, options?: any) => void;
      Cart?: {
        addProduct: (id: number) => void;
      };
      ProductBrowserPopup?: {
        show: (options: { productId: number }) => void;
      };
      init: () => void;
      refreshConfig: () => void;
    };
    ecwid_script_defer: boolean;
    ecwid_dynamic_widgets: boolean;
    ec?: {
      order?: {
        extraFields?: {
          [key: string]: {
            title: string;
            type: string;
            value: string;
            orderDetailsDisplaySection: string;
            showInNotifications: boolean;
            showInInvoice: boolean;
            required: boolean;
          };
        };
      };
    };
  }
}
