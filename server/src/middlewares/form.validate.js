import joi from 'joi';

// Define the schema for the incoming request body
const formSchema = joi.object({
  name: joi.string().required(),
  phone: joi.string().pattern(/^[0-9]{10}$/).required(),
  email: joi.string().email().required(),
  event: joi.string().valid('Paper Presentation', 'Poster Presentation', 'Technical Quiz ').required(),
  branch: joi.string().valid('cse', 'ece', 'mech').required(),
  duNumber: joi.string().pattern(/^[A-Za-z][0-9]{7}$/).required(),
  participants: joi.number().integer().min(0).max(4).required(),
  participantsDetails: joi.array().items(
    joi.object({
      name: joi.string().min(2).required()
    })
  ).length(joi.ref('participants')).required()
});
