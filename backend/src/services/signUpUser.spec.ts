import {SignUpUser} from './signUpUser'
import db from '../database/connecting'
import { HttpResponse, HttpRequest } from '../protocols/http'

export interface InsertData {
  insert (newUser: HttpRequest): HttpResponse
}

const makeInsertData = (): InsertData => {
  class InsertDataStub {
    insert (newUser: HttpRequest): HttpResponse {
      return {
        body: newUser.body,
        statusCode: 200
      }
    }
  }
  return new InsertDataStub()
}

const makeFakeRequest = (): HttpRequest => {
  return {
    body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
    }
  }
}

const makeSut = (): any => {
  const sut = new SignUpUser()
  return {
    sut
    }
  }


describe('SignUp service', () => {

  afterAll(async () => {
    await db.end()
  })

  test('Should return 400 if no name is provided', () => {
    const {sut} = makeSut()
    const httpReq = {
      body: {
        email: 'any.email@mail.com',
        password: 'any_password'
      }
    }
    const httpRes = sut.userFilter(httpReq)
    expect(httpRes).toEqual(400)
  })

  test('Should return 400 if no email is provided', () => {
    const {sut} = makeSut()
    const httpReq = {
      body: {
        name: 'any_name',
        password: 'any_password'
      }
    }
    const httpRes = sut.userFilter(httpReq)
    expect(httpRes).toEqual(400)
  })

  test('Should return 400 if no password is provided', () => {
    const {sut} = makeSut()
    const httpReq = {
      body: {
        name: 'any_name',
        email: 'any.email@mail.com'
      }
    }
    const httpRes = sut.userFilter(httpReq)
    expect(httpRes).toEqual(400)
  })

  test('Should return 400 if no password is provided', () => {
    const {sut} = makeSut()
    const httpReq = {
      body: {
        name: 'any_name',
        email: 'any.email@mail.com'
      }
    }
    const httpRes = sut.userFilter(httpReq)
    expect(httpRes).toEqual(400)
  })

  test('Should return 500 if createUser throws', async () => {
    const {sut} = makeSut()
    const insertDataStub = makeInsertData()
    jest.spyOn(insertDataStub, 'insert').mockImplementationOnce(() => {
      return {
        body: {},
        statusCode: 500
      }
    })
    const httpResponse = await sut.userFilter(makeFakeRequest())
    expect(httpResponse).toEqual(500)
  })

  test('Should return 200 if valid data is provided', async () => {
    const {sut} = makeSut()
    const httpResponse = await sut.userFilter(makeFakeRequest())
    expect(httpResponse).toEqual(200)
  })
})
