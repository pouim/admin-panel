export interface NavItemProps {
  id: string;
  messageId: string;
  title: string;
  icon?: string;
  exact?: boolean;
  url?: string;
  type?: string;
  count?: number;
  color?: string;
  auth?: string[];
  children?: NavItemProps[] | NavItemProps;
}

const routesConfig: NavItemProps[] = [
  {
    id: 'signals',
    title: 'Signals',
    messageId: 'Signals',
    type: 'item',
    url: `${process.env.PUBLIC_URL}/signals`,
    icon: 'bar_chart',
  },
  {
    id: 'shop',
    title: 'Shop',
    messageId: 'Shop',
    type: 'item',
    url: `${process.env.PUBLIC_URL}/shop`,
    icon: 'shop',
  },
  {
    id: 'myOrders',
    title: 'My Orders',
    messageId: 'My Orders',
    type: 'item',
    url: `${process.env.PUBLIC_URL}/my-orders`,
    icon: 'shopping_cart',
  },
  {
    id: 'webSites',
    title: 'Refferal Links',
    messageId: 'Refferal Links',
    type: 'item',
    url: `${process.env.PUBLIC_URL}/web-sites`,
    icon: 'web',
  },
  // {
  //   id: 'chart',
  //   title: 'Chart',
  //   messageId: 'Chart',
  //   type: 'item',
  //   url: '/chart',
  //   icon: 'insert_chart',
  // },
  {
    id: 'chat',
    title: 'Chat',
    messageId: 'Chat',
    type: 'item',
    url: `${process.env.PUBLIC_URL}/chat`,
    icon: 'chat',
  },
  {
    id: 'analyze',
    title: 'Analysis ',
    messageId: 'Analyze',
    type: 'item',
    url: `${process.env.PUBLIC_URL}/analyze`,
    icon: 'timeline',
  },
  {
    id: 'promotion',
    title: 'Promotion',
    messageId: 'Promotion',
    type: 'collapse',
    icon: 'record_voice_over',
    children: [
      {
        id: 'Promotions',
        title: 'Promotions',
        messageId: 'Promotions',
        type: 'item',
        url: `${process.env.PUBLIC_URL}/promotion`,
      },
      {
        id: 'amountRequests',
        title: 'Amount Requests',
        messageId: 'Amount Requests',
        type: 'item',
        url: `${process.env.PUBLIC_URL}/amount-requests`,
      },
    ],
  },

  {
    id: 'table',
    title: 'Table',
    messageId: 'Table',
    type: 'item',
    url: `${process.env.PUBLIC_URL}/table`,
    icon: 'table_chart',
  },

  {
    id: 'subscription',
    title: 'Subscription',
    messageId: 'Subscription',
    type: 'item',
    url: `${process.env.PUBLIC_URL}/subscription`,
    icon: 'subscriptions',
  },

  {
    id: 'ticket',
    title: 'Ticket',
    messageId: 'Ticket',
    type: 'item',
    url: `${process.env.PUBLIC_URL}/help-desk`,
    icon: 'contact_support',
  },
];
export default routesConfig;
