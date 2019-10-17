/**
 *
 * @param props {array} array of changer`s classes
 */
export default class Validate {
  constructor(props) {
    this.props = props;
  }

  /**
   * main function
   * @returns {*|boolean}
   */
  check() {
    return this.props.every(changer => this.checkChanger(changer));
  }

  /**
   * check every changer
   * @param changer {object} changer class
   * @returns {boolean} validate result
   */
  checkChanger(changer) {
    let input = changer.field;

    if (input.name === 'role' || input.name === 'isArchive') return true;

    let check = this.checkValue(input);

    if(check !== true) {
      this.setError(changer, check);
      return false;
    }

    return true;
  }

  /**
   * check input`s value
   * @param input {object} input for check
   * @returns {boolean|string} check result or type of error
   */
  checkValue(input) {
    let empty = input.value.length === 0 && 'empty';
    let short = input.value.length < 5 && 'short';

    return empty || short || true;
  }

  /**
   * set error if check is failed
   * @param changer {object} changer class
   * @param errorType {string} type of error
   */
  setError(changer, errorType) {
    changer.addError(errorType);
    throw new Error('invalid value of ' + changer.field.name);
  }
}