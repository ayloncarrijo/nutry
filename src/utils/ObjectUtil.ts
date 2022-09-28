class ObjectUtil {
  public static isAllDefined<T extends Record<PropertyKey, unknown>>(
    object: T
  ): object is { [Key in keyof T]: NonNullable<T[Key]> } {
    return Object.values(object).every((value) => value != null);
  }

  public static isKeyOf<T extends Record<PropertyKey, unknown>>(
    obj: T,
    key: PropertyKey
  ): key is keyof T {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }
}

export default ObjectUtil;
