import { defineMock } from 'vite-plugin-mock-dev-server'
import { localeFaker } from './shared/faker'

export default defineMock([
  {
    url: 'medi_rpc/test',
    body: { name: Array.from({ length: 6 }).map(() => localeFaker.person.fullName()) },
  },
])
