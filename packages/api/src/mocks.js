import { MockList } from 'apollo-server';
import casual from 'casual';

casual.register_provider({
  game: () => casual.random_element(['Slot', 'Table']),
});

export default {
  Date: () => new Date(529542000000 * Math.random() - Date.now()),
  Casino: () => ({
    name: casual.company_name,
    address: casual.street,
    zipcode: casual.zip(5),
    city: casual.city,
    country: casual.country,
  }),
  PageInfo: () => ({
    startCursor: casual.uuid,
    endCursor: casual.uuid,
  }),
  Edge: () => ({
    cursor: casual.uuid,
  }),
  Query: () => ({}),
};
