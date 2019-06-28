const validators = {
  name: {
    rules: [

      {
        test: (value) => {
          let regex = /^[a-zA-Z_]+$/;
          return value.length > 0 && regex.test(value);
        },
        message: "Name not be empty and only contain characters",
      }
    ],
    errors: [],
    valid: false,
    state: '',
  },
  email: {
    rules: [
      {
        test: (value) => {
            return value.length < 0
          },
          message: 'Email should not be empty'
      },
      {
        test: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'Email Not valid',
      }
    ],
    errors: [],
    valid: false,
    state: '',
  },
  phone: {
    rules: [
      {
        test: /^[0-9_]+$/,
        message: 'Phone should allow only numbers',
      },
      {
        test: (value) => {
          return value.length < 0;
        },
        message: 'Phone should not be empty'
      }
    ],
    errors: [],
    valid: false,
    state: '',
  },
  percentage: {
    rules: [
      {
        test: /^[0-9_]+$/,
        message: 'Percentage should allow only Positive numbers',
      }
    ],
    errors: [],
    valid: false,
    state: '',
  },
  password: {
    rules: [
      {
        test: (value) => {
          return value.length < 0;
        },
        message: 'Password should not be empty'
      }
    ],
    errors: [],
    valid: false,
    state: ''
  },
  Cpassword: {
    rules: [
      {
        test: (value) => {
          return value.length < 0;
        },
        message: 'Confirm Password should not be empty'
      }
    ],
    errors: [],
    valid: false,
    state: ''
  },
};

export default validators;