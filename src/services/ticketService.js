import Ticket from '../models/Ticket';

class TicketService {
  static async generateTicket(purchaser, quantity, price) {
    const ticket = new Ticket({
      code: generateUniqueCode(), 
      purchaser,
    });

    await ticket.save();
    return ticket;
  }

}

export default TicketService;