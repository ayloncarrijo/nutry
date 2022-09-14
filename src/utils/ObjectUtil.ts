class ObjectUtil {
  public static isKeyOf<T extends Record<PropertyKey, any>>(
    obj: T,
    key: PropertyKey
  ): key is keyof T {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }
}

export default ObjectUtil;
