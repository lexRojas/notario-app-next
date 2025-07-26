import { createTheme } from "flowbite-react";

export const customThemeTableHead = createTheme({
  table: {
    // root: {
    //   base: "w-full text-left text-sm text-gray-500 dark:text-gray-400",
    //   shadow:
    //     "absolute top-0 left-0 -z-10 h-full w-full rounded-lg bg-white drop-shadow-md dark:bg-black",
    //   wrapper: "relative",
    // },
    // body: {
    //   base: "group/body",
    //   cell: {
    //     base: "px-3 py-1",
    //   },
    // },
    // head: {
    //   base: "group/head text-xs text-gray-100 uppercase dark:text-gray-700",
    //   cell: {
    //     base: "bg-gray-300 px-6 py-2 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-yellow-100",
    //   },
    // },

    root: {
      base: "w-full border border-gray-300 text-left text-sm text-gray-500 dark:border-gray-600 dark:text-gray-400",
      shadow:
        "absolute top-0 left-0 -z-10 h-full w-full bg-white drop-shadow-md dark:bg-black",
      wrapper: "relative",
    },
    body: {
      base: "group/body",
      cell: {
        base: "border-gray-200 px-6 py-4 dark:border-gray-600",
      },
    },
    head: {
      base: "group/head text-xs text-gray-700 uppercase dark:text-gray-400",
      cell: {
        base: "border border-gray-200 bg-blue-500 px-6 py-3 dark:border-gray-600 dark:bg-gray-700",
      },
    },
    row: {
      base: "group/row border border-gray-200 dark:border-gray-600",
      hovered: "hover:bg-gray-50 dark:hover:bg-gray-600",
      striped:
        "odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700",
    },
  },
});

export const customThemePagination = createTheme({
  pagination: {
    base: "text-xs",
    layout: {
      table: {
        base: "text-gray-700 dark:text-gray-400",
        span: "font-semibold text-gray-900 dark:text-white",
      },
    },
    pages: {
      base: "xs:mt-0 mt-0 inline-flex items-center -space-x-px",
      showIcon: "inline-flex",
      previous: {
        base: "ml-0 rounded-l-lg border border-gray-300 bg-white px-3 py-2 text-xs leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
        icon: "h-4 w-4",
      },
      next: {
        base: "rounded-r-lg border border-gray-300 bg-white px-3 py-2 text-xs leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
        icon: "h-4 w-4",
      },
      selector: {
        base: "w-12 border border-gray-300 py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
        active:
          "bg-cyan-50 text-cyan-600 hover:bg-cyan-100 hover:text-cyan-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white",
        disabled: "cursor-not-allowed opacity-50",
      },
    },
  },
});

export const customThemeTextInput = createTheme({
  textInput: {
    field: {
      input: {
        sizes: {
          cus: "p-1 text-center font-semibold sm:text-xl",
        },
      },
    },
  },
});
