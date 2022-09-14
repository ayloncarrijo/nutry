class ObjectUtil {
  public static isKeyOf<T extends Record<PropertyKey, unknown>>(
    obj: T,
    key: PropertyKey
  ): key is keyof T {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }
}

export default ObjectUtil;
