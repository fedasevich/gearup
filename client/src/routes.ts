import { MAIN_ROUTE, ORDERS_ROUTE, ORDER_ROUTE, SEARCH_ROUTE, SUPPORT_ROUTE } from './libs/constants/routes';
import MainPage from './pages/MainPage';
import { OrderPage } from './pages/OrderPage';
import { OrdersPage } from './pages/OrdersPage';
import SearchPage from './pages/SearchPage';
import { SupportPage } from './pages/SupportPage';

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    Component: MainPage
  },
  {
    path: SUPPORT_ROUTE,
    Component: SupportPage
  },
  {
    path: SEARCH_ROUTE,
    Component: SearchPage
  },
  {
    path: ORDER_ROUTE,
    Component: OrderPage
  },
  {
    path: ORDERS_ROUTE,
    Component: OrdersPage
  }
];
