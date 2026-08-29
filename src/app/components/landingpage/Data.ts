import {
  Icon,
  IconAdjustments,
  IconArchive,
  IconBook,
  IconBrandTailwind,
  IconBuildingCarousel,
  IconCalendar,
  IconChartPie,
  IconDatabase,
  IconDiamond,
  IconLanguageKatakana,
  IconLayersIntersect,
  IconLockAccess,
  IconMessage,
  IconRefresh,
  IconShieldLock,
  IconWand,
  IconBrandDouban,
} from "@tabler/icons-react";


interface ListFeatureTypes {
  featureicon: Icon;
  title: string;
  subtitle: string;
  bgcolor: string;
}

const listFeature: ListFeatureTypes[] = [
  {
    featureicon: IconWand,
    title: "6 Theme Colors",
    subtitle: "MaterialM Admin comes with 6 pre-defined theme colors.",
    bgcolor: "primary",
  },
  {
    featureicon: IconDiamond,
    title: "3400+ Font Icons",
    subtitle: "The MaterialM Admin package includes numerous icon fonts.",
    bgcolor: "success",
  },
  {
    featureicon: IconCalendar,
    title: "Calendar Design",
    subtitle: "Our package includes a well-designed calendar.",
    bgcolor: "primary",
  },
  {
    featureicon: IconBrandDouban,
    title: "4+ Frontend Pages",
    subtitle: "We have added useful frontend pages with MaterialM Admin",
    bgcolor: "error",
  },
  {
    featureicon: IconRefresh,
    title: "Regular Updates",
    subtitle: "We continuously enhance our pack with new features.",
    bgcolor: "warning",
  },
  {
    featureicon: IconArchive,
    title: "90+ Page Templates",
    subtitle:
      "Indeed, we offer 6 demos, each featuring over 90+ pages, to simplify the process.",
    bgcolor: "info",
  },
  {
    featureicon: IconAdjustments,
    title: "45+ UI Components",
    subtitle: "The MaterialM Admin Pack includes nearly 45 UI components.",
    bgcolor: "success",
  },
  {
    featureicon: IconBrandTailwind,
    title: "Tailwind",
    subtitle: "It is built using Tailwind, a robust UI component framework.",
    bgcolor: "warning",
  },
  {
    featureicon: IconBuildingCarousel,
    title: "Flowbite React",
    subtitle:
      "A utility-first CSS framework and UI component library for React applications.",
    bgcolor: "error",
  },

  {
    featureicon: IconShieldLock,
    title: "Firebase",
    subtitle:
      "offer robust real-time database capabilities, authentication, and additional features.",
    bgcolor: "error",
  },
  {
    featureicon: IconDatabase,
    title: "SWR",
    subtitle:
      "Swr provides way to fetch, cache, and update data in real-time applications.",
    bgcolor: "secondary",
  },
  {
    featureicon: IconLanguageKatakana,
    title: "i18 React",
    subtitle:
      "react-i18 is a robust framework for internationalization in React applications.",
    bgcolor: "primary",
  },

  {
    featureicon: IconLockAccess,
    title: "Next-Auth",
    subtitle:
      "We have integrated Google, GitHub, and Credential providers with NextAuth.",
    bgcolor: "primary",
  },

  {
    featureicon: IconLayersIntersect,
    title: "Lots of Table Examples",
    subtitle: "Tables are a fundamental requirement, and we've included them",
    bgcolor: "warning",
  },

  {
    featureicon: IconBook,
    title: "Detailed Documentation",
    subtitle:
      "We have created comprehensive documentation to make usage straightforward.",
    bgcolor: "secondary",
  },

  {
    featureicon: IconMessage,
    title: "Dedicated Support",
    subtitle:
      "We believe that exceptional support is essential, and we provide it.",
    bgcolor: "error",
  },
  {
    featureicon: IconChartPie,
    title: "Lots of Chart Options",
    subtitle:
      "With ApexCharts, we offer a wide variety of chart options if you can name it, we likely have it.",
    bgcolor: "success",
  },
];

/*User Review Section*/
import review1 from "@public/images/profile/user-2.jpg";
import review2 from "@public/images/profile/user-3.jpg";
import review3 from "@public/images/profile/user-4.jpg";

interface UserReviewTypes {
  img: any;
  review: string;
  title: string;
  subtitle: string;
}
const userReview: UserReviewTypes[] = [
  {
    img: review3,
    title: "Leslie Alexander",
    subtitle: "Product Designer, Appzio",
    review:
      "Such a beautiful, detailed, and extensive template. MaterialM admin is the perfect foundation for any project. I highly recommend this huge time saver.",
  },
  {
    img: review1,
    title: "Jenny Wilson",
    subtitle: "Features avaibility",
    review:
      "The dashboard template from wrappixel has helped me provide a cleanand sleek look to my dashboard and made it look exactly the way I wanted it to, mainly without having.",
  },
  {
    img: review2,
    title: "Minshan Cui",
    subtitle: "Features avaibility",
    review:
      "The quality of design is excellent, customizability and flexibility much better than the other products available in the market.I strongly recommend the wrappixel to other.",
  },
];


/*Demos Megamenu*/
export { listFeature, userReview };
