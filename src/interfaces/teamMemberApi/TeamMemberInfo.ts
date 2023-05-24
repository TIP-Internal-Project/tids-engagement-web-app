/* import Address from './Address';
import EmailAddress from './EmailAddress';
import Identification from './Identification';
import LeaveHistory from './LeaveHistory';
import PhoneNumber from './PhoneNumber';
import TeamMemberRelationship from './TeamMemberRelationship';*/

export default interface TeamMemberInfo {
    id?: string;
    workdayId: string;
    // href?: string;
    lastName: string;
    firstName: string;
    middleName?: string;
    immediateManager?: string;
    slt?: string;
    supervisoryOrganization?: string;
    functionalArea?: string;
    primaryWorkEmailAddress?: string;
    secondaryWorkEmailAddress?: string;
    /* suffix?: string;
    pictureURL?: string;
    maritalStatus?: string;
    birthDate?: string;
    gender?: string;
    peopleSoftId?: string;
    jobProfile?: string;
    businessTitle?: string;
    jobCode?: string;
    costCenterId?: string;
    division?: string;
    site?: string;
    originalHireDate?: string;
    hireDate?: string;
    conitinuousServiceDate?: string;
    billingStatus?: string;
    workShift?: string;
    benifitsServiceDate?: string;
    employeeType?: string;
    starsEarned?: number;
    leaveHistory?: LeaveHistory[];
    emailAddress: EmailAddress[];
    address?: Address[];
    phoneNumber?: PhoneNumber[];
    identification?: Identification[];
    teamMemberRelationship?: TeamMemberRelationship[];*/
}
