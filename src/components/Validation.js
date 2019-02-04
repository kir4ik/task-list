export default class Class
{
  constructor(rules)
  {
    this.rules = rules;
    this.res = {};
    this.glossary = this.getGlossary();
  }

  run(data)
  {
    this.res = {};
    let isSuccess = true;

    for (let nameField in this.rules) {
      let res = {
        isSuccess: true,
        errors: [],
        val: undefined,
        clean: undefined
      };

      for (let key in this.glossary) {
        let rule = this.rules[nameField][key];
        if(!rule) continue;

        res.val = data[nameField];
        res.clean = this.clean(data[nameField]);

        let msg = this.glossary[key](data[nameField], rule);
        if (msg === '') continue;

        res.errors.push(msg);
        res.isSuccess = false;
        isSuccess = false;
      }

      this.res[nameField] = res;
    }

    return Object.defineProperty(this.res, 'isSuccess', {
      value: isSuccess,
      enumerable: false
    })
  }

  getGlossary() {
    return {
      required: this.checkRequired,
      len: this.checkLen
    };
  }

  checkRequired(val)
  {
    let msg = '';

    if (val === null || typeof val === "undefined" || val === '') {
      msg = 'обязательное поле';
    }

    return msg;
  }

  checkLen(val, size)
  {
    let msg = '';
    const min = size[0];
    const max = size.length === 2 ? size[1] : min;

    if (val.length < min ) {
      return msg = 'минимальный размер поля: ' + min + ' символов';
    }
    else if (val.length > max) {
      return msg = 'максимальный размер поля: ' + max + ' символов';
    }

    return msg;
  }

  clean(val)
  {
    return val.replace(/\s+/gm, ' ').replace(/(?:^\s+)|(?:\s+$)/gm, '');
  }
}