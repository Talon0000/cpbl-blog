export default function converToSerializableObject(documents) {
	return JSON.parse(JSON.stringify(documents));
}
