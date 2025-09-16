import pandas as pd
import json
import random

# Create expanded career quiz questions (30 questions total)
expanded_questions = [
    # Realistic (R) - Hands-on, practical work
    {
        'questionId': 'r1',
        'questionText': 'I enjoy working with tools and machines',
        'category': 'psychometric',
        'options': [
            {'optionId': 'r1_a', 'optionText': 'Strongly Agree', 'R': 5, 'I': 0, 'A': 0, 'S': 0, 'E': 0, 'C': 1},
            {'optionId': 'r1_b', 'optionText': 'Agree', 'R': 3, 'I': 0, 'A': 0, 'S': 0, 'E': 0, 'C': 1},
            {'optionId': 'r1_c', 'optionText': 'Neutral', 'R': 1, 'I': 0, 'A': 0, 'S': 0, 'E': 0, 'C': 0},
            {'optionId': 'r1_d', 'optionText': 'Disagree', 'R': 0, 'I': 0, 'A': 0, 'S': 0, 'E': 0, 'C': 0},
            {'optionId': 'r1_e', 'optionText': 'Strongly Disagree', 'R': 0, 'I': 0, 'A': 0, 'S': 1, 'E': 0, 'C': 0}
        ]
    },
    {
        'questionId': 'r2',
        'questionText': 'I prefer working outdoors rather than in an office',
        'category': 'psychometric',
        'options': [
            {'optionId': 'r2_a', 'optionText': 'Strongly Agree', 'R': 4, 'I': 0, 'A': 1, 'S': 0, 'E': 0, 'C': 0},
            {'optionId': 'r2_b', 'optionText': 'Agree', 'R': 3, 'I': 0, 'A': 1, 'S': 0, 'E': 0, 'C': 0},
            {'optionId': 'r2_c', 'optionText': 'Neutral', 'R': 1, 'I': 0, 'A': 0, 'S': 0, 'E': 0, 'C': 0},
            {'optionId': 'r2_d', 'optionText': 'Disagree', 'R': 0, 'I': 1, 'A': 0, 'S': 0, 'E': 1, 'C': 2},
            {'optionId': 'r2_e', 'optionText': 'Strongly Disagree', 'R': 0, 'I': 2, 'A': 0, 'S': 0, 'E': 2, 'C': 3}
        ]
    },
    {
        'questionId': 'r3',
        'questionText': 'I like building or fixing things with my hands',
        'category': 'psychometric',
        'options': [
            {'optionId': 'r3_a', 'optionText': 'Strongly Agree', 'R': 5, 'I': 1, 'A': 1, 'S': 0, 'E': 0, 'C': 0},
            {'optionId': 'r3_b', 'optionText': 'Agree', 'R': 4, 'I': 1, 'A': 1, 'S': 0, 'E': 0, 'C': 0},
            {'optionId': 'r3_c', 'optionText': 'Neutral', 'R': 2, 'I': 0, 'A': 0, 'S': 0, 'E': 0, 'C': 0},
            {'optionId': 'r3_d', 'optionText': 'Disagree', 'R': 0, 'I': 0, 'A': 0, 'S': 1, 'E': 1, 'C': 1},
            {'optionId': 'r3_e', 'optionText': 'Strongly Disagree', 'R': 0, 'I': 0, 'A': 0, 'S': 2, 'E': 2, 'C': 2}
        ]
    },
    {
        'questionId': 'r4',
        'questionText': 'I enjoy physical activities and sports',
        'category': 'psychometric',
        'options': [
            {'optionId': 'r4_a', 'optionText': 'Strongly Agree', 'R': 3, 'I': 0, 'A': 0, 'S': 2, 'E': 1, 'C': 0},
            {'optionId': 'r4_b', 'optionText': 'Agree', 'R': 2, 'I': 0, 'A': 0, 'S': 1, 'E': 1, 'C': 0},
            {'optionId': 'r4_c', 'optionText': 'Neutral', 'R': 1, 'I': 0, 'A': 0, 'S': 0, 'E': 0, 'C': 0},
            {'optionId': 'r4_d', 'optionText': 'Disagree', 'R': 0, 'I': 1, 'A': 1, 'S': 0, 'E': 0, 'C': 1},
            {'optionId': 'r4_e', 'optionText': 'Strongly Disagree', 'R': 0, 'I': 2, 'A': 1, 'S': 0, 'E': 0, 'C': 2}
        ]
    },
    {
        'questionId': 'r5',
        'questionText': 'I prefer practical solutions over theoretical ones',
        'category': 'psychometric',
        'options': [
            {'optionId': 'r5_a', 'optionText': 'Strongly Agree', 'R': 4, 'I': 0, 'A': 0, 'S': 0, 'E': 2, 'C': 1},
            {'optionId': 'r5_b', 'optionText': 'Agree', 'R': 3, 'I': 0, 'A': 0, 'S': 0, 'E': 1, 'C': 1},
            {'optionId': 'r5_c', 'optionText': 'Neutral', 'R': 1, 'I': 1, 'A': 0, 'S': 0, 'E': 0, 'C': 0},
            {'optionId': 'r5_d', 'optionText': 'Disagree', 'R': 0, 'I': 3, 'A': 1, 'S': 0, 'E': 0, 'C': 0},
            {'optionId': 'r5_e', 'optionText': 'Strongly Disagree', 'R': 0, 'I': 4, 'A': 2, 'S': 0, 'E': 0, 'C': 0}
        ]
    },
    
    # Investigative (I) - Research, analysis, problem-solving
    {
        'questionId': 'i1',
        'questionText': 'I enjoy solving complex puzzles and problems',
        'category': 'aptitude',
        'options': [
            {'optionId': 'i1_a', 'optionText': 'Strongly Agree', 'R': 0, 'I': 5, 'A': 1, 'S': 0, 'E': 0, 'C': 1},
            {'optionId': 'i1_b', 'optionText': 'Agree', 'R': 0, 'I': 4, 'A': 1, 'S': 0, 'E': 0, 'C': 1},
            {'optionId': 'i1_c', 'optionText': 'Neutral', 'R': 0, 'I': 2, 'A': 0, 'S': 0, 'E': 0, 'C': 0},
            {'optionId': 'i1_d', 'optionText': 'Disagree', 'R': 1, 'I': 0, 'A': 0, 'S': 1, 'E': 1<edit_file>
<path>generate_expanded_quiz.py</path>
<content>
import pandas as pd
import json
import random

# Create expanded career quiz questions (30 questions total)
expanded_questions = [
    # Realistic (R) - Hands-on, practical work
    {
        'questionId': 'r1',
        'questionText': 'I enjoy working with tools and machines',
        'category': 'psychometric',
        'options': [
            {'optionId': 'r1_a', 'optionText': 'Strongly Agree', 'R': 5, 'I': 0, 'A': 0, 'S': 0, 'E': 0, 'C': 1},
            {'optionId': 'r1_b', 'optionText': 'Agree', 'R': 3, 'I': 0, 'A': 0, 'S': 0, 'E': 0, 'C': 1},
            {'optionId': 'r1_c', 'optionText': 'Neutral', 'R': 1, 'I': 0, 'A': 0, 'S': 0, 'E': 0, 'C': 0},
            {'optionId': 'r1_d', 'optionText': 'Disagree', 'R': 0, 'I': 0, 'A': 0, 'S': 0, 'E': 0, 'C': 0},
            {'optionId': 'r1_e', 'optionText': 'Strongly Disagree', 'R': 0, 'I': 0, 'A': 0, 'S': 1, 'E': 0, 'C': 0}
        ]
    },
    {
        'questionId': 'r2',
        'questionText': 'I prefer working outdoors rather than in an office',
        'category': 'psychometric',
        'options': [
            {'optionId': 'r2_a', 'optionText': 'Strongly Agree', 'R': 4, 'I': 0, 'A': 1, 'S': 0, 'E': 0, 'C': 0},
            {'optionId': 'r2_b', 'optionText': 'Agree', 'R': 3, 'I': 0, 'A': 1, 'S': 0, 'E': 0, 'C': 0},
            {'optionId': 'r2_c', 'optionText': 'Neutral', 'R': 1, 'I': 0, 'A': 0, 'S': 0, 'E': 0, 'C': 0},
            {'optionId': 'r2_d', 'optionText': 'Disagree', 'R': 0, 'I': 1, 'A': 1, 'S': 0, 'E': 0, 'C': 1},
            {'optionId': 'r2_e', 'optionText': 'Strongly Disagree', 'R': 0, 'I': 2, 'A': 1, 'S': 0, 'E': 0, 'C': 2}
        ]
    },
    # ... (Add more questions here to reach 20-40 total)
]

def export_expanded_quiz():
    # Flatten questions into CSV-like structure
    rows = []
    for q in expanded_questions:
        for opt in q['options']:
            row = {
                'questionId': q['questionId'],
                'questionText': q['questionText'],
                'category': q['category'],
                'optionId': opt['optionId'],
                'optionText': opt['optionText'],
                'R': opt['R'],
                'I': opt['I'],
                'A': opt['A'],
                'S': opt['S'],
                'E': opt['E'],
                'C': opt['C']
            }
            rows.append(row)
    df = pd.DataFrame(rows)
    df.to_csv('expanded_career_quiz_questions_expanded.csv', index=False)
    print(f"Exported expanded quiz with {len(expanded_questions)} questions to 'expanded_career_quiz_questions_expanded.csv'")

if __name__ == "__main__":
    export_expanded_quiz()
