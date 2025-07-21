export interface MyProps {
    activeSection: string;
    setActiveSection: (props:string) => void;
}

export interface SectionProp {
    setActiveSection: (props:string) => void;
}

export interface FormData {
  nome: string;
  email: string;
  mensagem: string;
}