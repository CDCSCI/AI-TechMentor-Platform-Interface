export const interviewer = {
  name: 'Maya',
  role: 'AI interviewer',
  image: "/4c9cb0ad-69d0-43d9-a230-f5e66718057d.jpg"
};

export const interviewQuestions: Record<string, string[]> = {
  Behavioral: [
  'Tell me a little about yourself and what draws you to this role.',
  'Tell me about a time you had to learn a new tool quickly to solve a problem.',
  'Describe a disagreement with a teammate. How did you handle it?',
  'Tell me about a project that didn’t go as planned. What did you learn?',
  'Where do you see yourself growing in the next two years?'],

  Technical: [
  'Walk me through how you’d troubleshoot a user who can’t reach a website.',
  'Explain the difference between TCP and UDP, and when you’d use each.',
  'How would you find what’s slowing down a Python script?',
  'What steps would you take after spotting a phishing email in the company?',
  'Describe a technical project you’re proud of and your role in it.'],

  'Case study': [
  'A client’s help desk tickets doubled last month. How would you find out why?',
  'How would you prioritize three urgent requests that arrive at the same time?',
  'Our sign-up page conversion dropped 20%. Where do you start?',
  'How would you explain a planned four-hour outage to non-technical staff?',
  'What would you measure to know if a new internal tool is working?'],

  'Career growth': [
  'What kind of team helps you do your best work?',
  'Which skill are you actively building right now, and how?',
  'Tell me about feedback that changed how you work.',
  'What would make you say yes to this offer?',
  'What questions do you have for me?']

};