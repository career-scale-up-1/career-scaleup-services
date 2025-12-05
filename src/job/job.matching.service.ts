import { Injectable } from '@nestjs/common';
import natural from 'natural';
import { JobDto } from './dto/job.dto.js';
import { User } from '../users/dto/user.dto.js';

@Injectable()
export class JobMatchingService {
  private tokenizer = new natural.WordTokenizer();
  private stemmer = natural.PorterStemmer;

  private tokenize(text: string): string[] {
    return this.tokenizer
      .tokenize((text || '').toLowerCase())
      .map((word) => this.stemmer.stem(word))
      .filter((token) => token.length > 2);
  }

  private getOverlapScore(a: Set<string>, b: Set<string>): number {
    let count = 0;
    for (const token of a) if (b.has(token)) count++;
    return count;
  }

  private getProfileTokens(profile: User) {
    return {
      profession: new Set(this.tokenize(profile.profession || '')),
      summary: new Set(this.tokenize(profile.summary || '')),
      skills: new Set(
        (profile.skills ?? []).flatMap((s) => this.tokenize(s || '')),
      ),
      education: new Set(this.tokenize(profile.education || '')),
    };
  }

  private getJobTokens(job: Omit<JobDto, 'recruiterId'>) {
    return {
      title: new Set(this.tokenize(job.title || '')),
      description: new Set(this.tokenize(job.description || '')),
      qualifications: new Set(
        (job.qualifications ?? []).flatMap((q) => this.tokenize(q || '')),
      ),
      responsibilities: new Set(
        (job.responsibilities ?? []).flatMap((r) => this.tokenize(r || '')),
      ),
    };
  }

  private computeMatchScore(profile: User, job: Omit<JobDto, 'recruiterId'>) {
    const profileTokens = this.getProfileTokens(profile);
    const jobTokens = this.getJobTokens(job);

    const professionMatch = [...profileTokens.profession].some((t) =>
      jobTokens.title.has(t),
    );
    if (!professionMatch) return 0;

    const professionScore =
      this.getOverlapScore(profileTokens.profession, jobTokens.title) * 3;
    const skillScore =
      this.getOverlapScore(profileTokens.skills, jobTokens.qualifications) * 2 +
      this.getOverlapScore(profileTokens.skills, jobTokens.description);
    const eduScore =
      this.getOverlapScore(profileTokens.education, jobTokens.qualifications) *
      2;
    const summaryScore = this.getOverlapScore(
      profileTokens.summary,
      jobTokens.description,
    );

    return professionScore + skillScore + eduScore + summaryScore;
  }

  getMatchedJobs(profile: User, jobs: Omit<JobDto, 'recruiterId'>[]) {
    const MIN_SCORE = 1;

    const matched = jobs
      .map((job) => ({
        job,
        score: this.computeMatchScore(profile, job),
      }))
      .filter(({ score }) => score >= MIN_SCORE)
      .sort((a, b) => b.score - a.score)
      .map(({ job }) => job);

    return {
      jobs: matched,
      totalJobs: matched.length,
    };
  }
}
