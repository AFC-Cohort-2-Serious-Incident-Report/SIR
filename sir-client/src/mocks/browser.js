import { rest, setupWorker } from 'msw';
import dataWithOne from '../Responder_Test_Data_1.json';

const worker = setupWorker(
  rest.get('/api/incidents', (req, res, ctx) => res(ctx.json(dataWithOne))),
);

export default worker;
