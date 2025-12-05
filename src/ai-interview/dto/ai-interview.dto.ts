import { ApiProperty } from '@nestjs/swagger';
import { JobDto } from '../../job/dto/job.dto.js';

export interface EvaluationDTO {
  evaluations: Record<
    string,
    {
      question_id: number;
      question: string;
      candidate_answer: string;
      evaluation: {
        score: number;
        max_score: number;
        assessment: string;
        strengths: string[];
        weaknesses: string[];
        feedback: string;
        suggested_improvements: string[];
        ideal_answer_elements: string[];
      };
    }
  >;
  summary: {
    total_questions: number;
    answered_questions: number;
    total_score: number;
    average_score: number;
    overall_assessment: string;
  };
}

export class AIInterviewDTO {
  id: string;
  resumeId: string;
  jobId: string;
  seekerId: string;

  totalQuestions: number;
  questions: QuestionDTO[];
  answers?: AnswerDTO[];
  evaluationReport?: string;

  createdAt: Date;
  updatedAt: Date;
}

export class InterviewDTO {
  totalQuestions: number;
  questions: QuestionDTO[];
}

export class QuestionDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  difficulty: string;

  @ApiProperty()
  question: string;

  @ApiProperty()
  context: string;

  @ApiProperty({ type: Array<String> })
  expectedAreas: string[];
}

export class AnswerDTO {
  questionId: string;

  answer: string;
}

export class CreateAiInterviewDTO {
  @ApiProperty({ example: 'cjv9abc123xyz' })
  resumeId: string;

  @ApiProperty()
  job: JobDto;
}

export class EvaluateInterviewDTO {
  @ApiProperty({ example: 'cjv9abc123xyz' })
  resumeId: string;

  @ApiProperty()
  questions: QuestionDTO[];

  @ApiProperty()
  answers: AnswerDTO[];
}
