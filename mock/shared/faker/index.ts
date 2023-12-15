import { Faker, en } from '@faker-js/faker'

export const localeFaker = new Faker({
  locale: [
    en,
    // zh_CN
  ],
})

localeFaker.seed(123)
