const prisma = require("../config/db");

async function createBooking(req, res) {
  try {
    const { showId, seatIds } = req.body;

    if (!showId || !seatIds || !seatIds.length) {
      return res
        .status(400)
        .json({ message: "Show ID and seats are required" });
    }

    const seats = await prisma.seat.findMany({
      where: {
        id: {
          in: seatIds,
        },
      },
    });

    if (seats.length !== seatIds.length) {
      return res.status(404).json({ message: "Some seats not found" });
    }

    for (let seat of seats) {
      if (seat.isBooked) {
        return res
          .status(400)
          .json({ message: `${seat.seatNumber} already booked` });
      }
    }

    let totalPrice = 0;

    for (let seat of seats) {
      totalPrice += seat.price + 30;
    }

    const booking = await prisma.$transaction(async (tx) => {
      const newBooking = await tx.booking.create({
        data: {
          userId: req.user.id,
          showId,
          totalPrice,
          seats: {
            connect: seatIds.map((id) => ({ id })),
          },
        },
        include: {
          seats: true,
          show: true,
          user: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
        },
      });

      await tx.seat.updateMany({
        where: {
          id: {
            in: seatIds,
          },
        },
        data: {
          isBooked: true,
        },
      });

      return newBooking;
    });

    res.status(201).json({
      message: "Booking successfull",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getBookedTicket(req, res) {
    
    try {
        const ticket = await prisma.booking.findUnique({
            where: {
                id: Number(req.params.id)
            },
            include: {
                seats: true,
                show: {
                    include:{
                        movie: true,
                    }
                }
            }
        });

        if (ticket.userId !== req.user.id) {
            return res.status(403).json({message: "Unauthorized access to ticket"})
        }

        res.status(200).json({
            message: "Ticket fetched successfully",
            ticket
        })

    } catch (error) {
        res.status(400).json({message: "Error fetching ticket", error: error.message})
    }
}

async function getBookings(req, res) {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        seats: true,
        show: {
            include: {
                movie: true,
            }
        }
      },
    });

    res.status(200).json({
        message: "Bookings fetched successfully",
        bookings
    })
  } catch (error) {
    res.status(400).json({message: "Error fetching bookings", error: error.message})
  }
}

module.exports = {
  createBooking,
  getBookings,
  getBookedTicket
};
