//Configuring dotenv in the base file doesn't set the environment vars in sub-modules.
//https://github.com/motdotla/dotenv/issues/133
import dotenv from 'dotenv';
dotenv.config({ silent: true });
