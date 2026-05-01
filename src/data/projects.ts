import { Project } from '../types';
import { morphiaProjectData } from './morphia';
import { surveyAgentProjectData } from './surveyagent';

export const PROJECTS: Project[] = [
    morphiaProjectData,
    surveyAgentProjectData,
];
