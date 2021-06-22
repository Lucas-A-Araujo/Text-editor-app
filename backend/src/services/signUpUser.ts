import { InsertUser } from '../database/insertTables'
import { HttpResponse, HttpRequest } from '../protocols/http'


export class SignUpUser {

  userFilter (newUser: HttpRequest) {
      try {
      const sut = new InsertUser()
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!newUser.body[field]) {
          return 400
        }
      }

      return sut.insertData(newUser)
    }
    catch(error) {
      return 500
    }
  }
}