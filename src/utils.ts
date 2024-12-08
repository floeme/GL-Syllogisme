// Utility functions

/**
 * If the given key is not present in the given map, associates it with the given value.
 * Otherwise, associates it with the result of the given remapping function, which takes the existing value and the
 * given value.
 *
 * This is an implementation of the {@link https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Map.html#merge(K,V,java.util.function.BiFunction) `Map.merge`}
 * method from Java, except that it doesn't work with nullish values.
 *
 * @param map Map to modify
 * @param key Map key
 * @param value Value to associate with the key if it is not present, or to be merged with the existing value
 * @param remappingFunction Function to compute the new value to be associated with the key, if the key is already present
 * @returns The new value associated with the key
 */
export function mergeMapValue<K, V>(
    map: Map<K, V>,
    key: K,
    value: V,
    remappingFunction: (oldValue: V, value: V) => V): V
{
    if (map.has(key)) {
        const newValue = remappingFunction(<V>map.get(key), value);
        map.set(key, newValue);
        return newValue;
    } else {
        map.set(key, value);
        return value;
    }
}
