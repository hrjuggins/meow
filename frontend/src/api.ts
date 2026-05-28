import { NextDeliveryResponse } from './types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

export async function fetchNextDelivery(userId: string): Promise<NextDeliveryResponse> {
  const response = await fetch(`${API_BASE_URL}/comms/your-next-delivery/${userId}`);

  if (!response.ok) {
    throw new ApiError(response.status, 'Request failed');
  }

  return (await response.json()) as NextDeliveryResponse;
}
