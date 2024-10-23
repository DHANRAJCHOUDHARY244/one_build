import { setupWorker } from 'msw/browser';

import orgMockApi from './handlers/_org';
import demoMockApi from './handlers/_demo';

const handlers = [ ...orgMockApi, ...demoMockApi];
const worker = setupWorker(...handlers);

export default worker
