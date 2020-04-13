export const routeHome = '/',
    routeListSignIn = '/signin',
    routeListSignOut = '/signout',
    routeSignIn = (childId?: string | number) => `/signin/${childId ? childId : `:childId`}`,
    routeSignOut = (childId?: string | number) => `/signout/${childId ? childId : `:childId`}`,
    routeReceiptSignIn = (pickUpTime?: string | number) => `/signin/receipt/${pickUpTime ? pickUpTime : `:pickUpTime`}`,
    routeReceiptSignOut = `/signout/receipt`