import { NotFoundError } from '@/common/domain/erros/not-found-error'
import { UsersInMemoryRepository } from './users-in-memory.repository'
import { UsersDataBuilder } from '../../testing/helpers/users-data-builder'
import { ConflictError } from '@/common/domain/erros/conflict-error'

describe('UsersInMemoryRepository Unit Tests', () => {
  let sut: UsersInMemoryRepository

  beforeEach(() => {
    sut = new UsersInMemoryRepository()
    sut.items = []
  })

  describe('findByEmail', () => {
    it('should throw error when user not found', async () => {
      await expect(() => sut.findByEmail('a@a.com')).rejects.toBeInstanceOf(
        NotFoundError,
      )
      await expect(() => sut.findByEmail('a@a.com')).rejects.toThrow(
        new NotFoundError('User not found using email a@a.com'),
      )
    })
  })

  describe('findByName', () => {
    it('should throw error when user not found', async () => {
      await expect(() => sut.findByName('John Doe')).rejects.toBeInstanceOf(
        NotFoundError,
      )

      await expect(sut.findByName('John Doe')).rejects.toThrow(
        new NotFoundError('User not found using name John Doe'),
      )
    })

    it('should find a user by name', async () => {
      const user = UsersDataBuilder({ name: 'John Doe' })
      await sut.insert(user)
      const result = await sut.findByName(user.name)
      expect(result).toStrictEqual(user)
    })
  })

  describe('conflictingEmail', () => {
    it('should throw error when user found', async () => {
      const user = UsersDataBuilder({ email: 'a@a.com' })
      await sut.insert(user)
      await expect(sut.conflictingEmail('a@a.com')).rejects.toThrow(
        ConflictError,
      )

      await expect(sut.conflictingEmail('a@a.com')).rejects.toThrow(
        new ConflictError('Email already used on another user.'),
      )
    })

    it('should not find a user by email', async () => {
      expect.assertions(0)
      await sut.conflictingEmail('a@a.com')
    })
  })

  // describe('applyFilter', () => {})

  // describe('applySort', () => {})
})
