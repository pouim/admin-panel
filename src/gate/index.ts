
import jwtAxios, { file } from '@crema/services/auth/jwt-auth/jwt-api';


const Common = {
  paginateApi: ({url}: any) => jwtAxios.get(url),
}


const Signals = {
  getSignals: () => jwtAxios.get('signals/'),
  getSiganlsById: (id: any) => jwtAxios.get(`signals/${id}/`),
  reqParticipate: ({id}: any) => jwtAxios.post(`/signals/${id}/participate/`),
};

const Websites = {
  getWbsites: () => jwtAxios.get('websites/'), 
};

const Analyzes = {
  getAnalyzes: () => jwtAxios.get('analyses/'), 
  postAnalyze: (data: any) => jwtAxios.post(`analyses/`,data),
};

const User = {
  getUser: () => jwtAxios.get('user/'), 
  updateUser: (data: any) => jwtAxios.put('user/', data), 
  getSubscriptions: () => jwtAxios.get('subscriptions/'),
  reqSubscription: (data: any) => jwtAxios.post('subscriptions/', data),
};

const Plans = {
  getPlans: () => jwtAxios.get('plans/'), 
};

const tickets = {
  createTicket: (data:any) => jwtAxios.post(`tickets/`,data),
  tickets: () => jwtAxios.get<any[] | undefined>(`tickets/?limit=3&offset=0`),
  ticket: (id: number) => jwtAxios.get(`/tickets/${id}/?name=tickets-detail`),
  messages: (ticketId: any) => jwtAxios.get(`/messages/?ticket=${ticketId}`),
  sendMessages: (data: any) => file(`/messages/`,data,"post"),
  sendTextMessages: (data: any) => jwtAxios.post(`/messages/`,data),
  complateTicket: ({id,data}: any) => file(`/tickets/${id}/?name=tickets-detail`,data,"put"),
}

const Comments = {
  postCommnet : (data: any) => jwtAxios.post(`comments/`,data),
  actionCommnet : (data: any) => jwtAxios.post(`comments/${data.id}/${data.action}`),
}

const Orders = {
  getProducts: () => jwtAxios.get('shop/products/'), 
  searchProducts: (data: any) => jwtAxios.get(`shop/products/?search=${data}`), 
  buyProduct: (data:any) => jwtAxios.post(`shop/orders/`,data),
  getOrders: () => jwtAxios.get('shop/orders/'), 
}

const Promotions = {
  getPromotions: () => jwtAxios.get('promotions/'), 
}

const Withdraws = {
  getWithdraws: () => jwtAxios.get('withdraws/'),
  reqWithdraws: (data: any) => jwtAxios.post('withdraws/', data),
};

const Table = {
  getTableData: () => jwtAxios.get('tables/'),
}



export default {
  ...Common,
  ...Signals,
  ...Websites,
  ...Analyzes,
  ...User,
  ...Plans,
  ...tickets,
  ...Comments,
  ...Orders,
  ...Promotions,
  ...Withdraws,
  ...Table,
};
