import { Request, Response } from 'express';
import { InviteController } from '../modules/invite/invite.controller';
import { setUpPem, verifyAccessToken } from '../middlewares/authMiddleware';
import { AuthController } from '../modules/auth/auth.controller';
import { MeiliSearchController } from '../modules/meiliSearch/meiliSearch.controller';
import { PaymentController } from '../modules/payment/payment.controller';
import { TravelMatchController } from '../modules/traveler_match/travelmatch.controller';
import { UserController } from '../modules/users/user.controller';
import { BuilderHistoryController } from '../modules/builderHistory/builderHistory.controller';

const userController = new UserController();
const authController = new AuthController();
const meilisearchController = new MeiliSearchController();
const travelMatchController = new TravelMatchController();
const inviteController = new InviteController();
const builderHistory = new BuilderHistoryController();

export const noAuthRoutes = [
  {
    path: '/nats-test/',
    middleware: [],
    action: () => {
      
    },
  },
  {
    path: '/auth/',
    middleware: [],
    action: authController.routes(),
  },
  {
    path: '/payment/',
    middleware: [],
    action: new PaymentController().routes(),
  }
];

export const AppRoutes = [
  {
    path: '/user/',
    middleware: [setUpPem, verifyAccessToken],
    action: userController.routes(),
  },
  {
    path: '/matchTraveler/',
    middleware: [setUpPem, verifyAccessToken],
    action: travelMatchController.routes(),
  },
  {
    path: '/travelerRecommendations/',
    middleware: [setUpPem, verifyAccessToken],
    action: meilisearchController.routes(),
  },
  {
    path: '/invites/',
    middleware: [setUpPem, verifyAccessToken],
    action: inviteController.routes(),
  },
  {
    path: '/builder-history',
    middleware: [setUpPem, verifyAccessToken],
    action: builderHistory.routes()
  }
];
