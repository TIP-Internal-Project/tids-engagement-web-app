import Characteristic from './Characteristic';

export default interface Relationship {
    name: string,
    id: string,
    characteristic: Characteristic[]
}