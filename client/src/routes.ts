import { MAIN_ROUTE, SUPPORT_ROUTE } from './libs/constants/routes';
import MainPage from './pages/MainPage';
import { SupportPage } from './pages/SupportPage';

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    Component: MainPage
  },
  {
    path: SUPPORT_ROUTE,
    Component: SupportPage
  }
  // {
  //   path: SHOP_ROUTE_CATEGORY,
  //   Component: MainPage
  // },
  // {
  //   path: CART_ROUTE,
  //   Component: CartPage
  // },
  // {
  //   path: PRODUCT_ROUTE_$ID,
  //   Component: ProductPage
  // },
  // {
  //   path: PRIVACY_POLICY_ROUTE,
  //   Component: PrivacyPolicyPage
  // },
  // {
  //   path: TERMS_OF_SERVICE_ROUTE,
  //   Component: TermsOfServicePage
  // }
];
