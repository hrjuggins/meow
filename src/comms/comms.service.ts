import { Injectable, NotFoundException } from '@nestjs/common';
import * as users from '../../data.json';
import { NextDeliveryResponse, User } from './comms.types';
import {
  calculateTotalPricePence,
  formatCatNames,
  isFreeGiftEligible,
  penceToPounds,
} from './comms.utils';

@Injectable()
export class CommsService {
  private readonly users: User[] = users as User[];

  getNextDelivery(userId: string): NextDeliveryResponse {
    const user = this.users.find((entry) => entry.id === userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const activeCats = user.cats.filter((cat) => cat.subscriptionActive);
    const activeCatNames = activeCats.map((cat) => cat.name);
    const totalPricePence = calculateTotalPricePence(activeCats);
    const totalPrice = penceToPounds(totalPricePence);
    const freeGift = isFreeGiftEligible(totalPricePence);

    if (activeCatNames.length === 0) {
      return {
        title: 'Your next delivery',
        message: `Hey ${user.firstName}! You currently have no active cat subscriptions, so there is nothing to charge for your next order.`,
        totalPrice,
        freeGift,
      };
    }

    const formattedCatNames = formatCatNames(activeCatNames);

    return {
      title: `Your next delivery for ${formattedCatNames}`,
      message: `Hey ${user.firstName}! In two days' time, we'll be charging you for your next order for ${formattedCatNames}'s fresh food.`,
      totalPrice,
      freeGift,
    };
  }
}
