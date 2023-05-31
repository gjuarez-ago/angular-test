
export interface Company {
    id: number;
    companyName: string;
}

export interface Content {
    id: number;
    names: string;
    fatherLastName: string;
    motherLastName: string;
    numberPhone: string;
    username: string;
    token?: any;
    expireToken?: any;
    role: string;
    joinDate: number;
    authorities: string[];
    lastLoginDate?: any;
    company: Company;
    active: boolean;
    notLocked: boolean;
}

export interface Sort {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
}

export interface Pageable {
    sort: Sort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
}

export interface Sort2 {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
}

export interface UserPaginate {
    content: Content[];
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: Sort2;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}