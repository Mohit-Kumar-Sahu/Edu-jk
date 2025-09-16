import pandas as pd
import json
import os

print("Starting model generation...")

# Check if CSV file exists
csv_file = 'expanded_career_quiz_questions.csv'
if not os.path.exists(csv_file):
    print(f"Error: {csv_file} not found!")
    exit(1)

# Load the CSV data
try:
    df = pd.read_csv(csv_file)
    print(f"Loaded CSV with {len(df)} rows")
except Exception as e:
    print(f"Error loading CSV: {e}")
    exit(1)

class CareerQuizModel:
    def __init__(self, csv_data):
        self.df = csv_data
        self.questions = self._parse_questions()
        self.riasec_careers = self._define_career_mappings()
        
    def _parse_questions(self):
        questions = {}
        
        for _, row in self.df.iterrows():
            q_id = row['questionId']
            
            if q_id not in questions:
                questions[q_id] = {
                    'id': q_id,
                    'text': row['questionText'],
                    'category': row['category'],
                    'options': []
                }
            
            option = {
                'id': row['optionId'],
                'text': row['optionText'],
                'scores': {
                    'R': int(row['R']) if pd.notna(row['R']) else 0,
                    'I': int(row['I']) if pd.notna(row['I']) else 0,
                    'A': int(row['A']) if pd.notna(row['A']) else 0,
                    'S': int(row['S']) if pd.notna(row['S']) else 0,
                    'E': int(row['E']) if pd.notna(row['E']) else 0,
                    'C': int(row['C']) if pd.notna(row['C']) else 0
                }
            }
            
            questions[q_id]['options'].append(option)
        
        return list(questions.values())
    
    def _define_career_mappings(self):
        return {
            'R': {
                'name': 'Realistic',
                'description': 'Practical, hands-on, mechanical',
                'careers': [
                    'Mechanical Engineer', 'Electrician', 'Carpenter', 'Pilot',
                    'Automotive Technician', 'Civil Engineer', 'Architect',
                    'Agricultural Engineer', 'Construction Manager', 'Surveyor'
                ]
            },
            'I': {
                'name': 'Investigative',
                'description': 'Analytical, scientific, research-oriented',
                'careers': [
                    'Data Scientist', 'Research Scientist', 'Software Engineer',
                    'Doctor', 'Pharmacist', 'Laboratory Technician',
                    'Statistician', 'Biologist', 'Chemist', 'Physicist'
                ]
            },
            'A': {
                'name': 'Artistic',
                'description': 'Creative, expressive, innovative',
                'careers': [
                    'Graphic Designer', 'Writer', 'Musician', 'Artist',
                    'Interior Designer', 'Fashion Designer', 'Photographer',
                    'Film Director', 'Art Therapist', 'Creative Director'
                ]
            },
            'S': {
                'name': 'Social',
                'description': 'Helping, teaching, caring for others',
                'careers': [
                    'Teacher', 'Counselor', 'Social Worker', 'Nurse',
                    'Therapist', 'Human Resources Manager', 'Community Worker',
                    'Psychologist', 'Rehabilitation Counselor', 'School Principal'
                ]
            },
            'E': {
                'name': 'Enterprising',
                'description': 'Leading, persuading, managing',
                'careers': [
                    'Business Manager', 'Sales Representative', 'Entrepreneur',
                    'Marketing Manager', 'Lawyer', 'Real Estate Agent',
                    'Financial Advisor', 'Project Manager', 'CEO', 'Politician'
                ]
            },
            'C': {
                'name': 'Conventional',
                'description': 'Organizing, detail-oriented, systematic',
                'careers': [
                    'Accountant', 'Bookkeeper', 'Administrative Assistant',
                    'Bank Teller', 'Data Entry Clerk', 'Office Manager',
                    'Auditor', 'Tax Preparer', 'Secretary', 'Librarian'
                ]
            }
        }
    
    def export_model_data(self):
        return {
            'questions': self.questions,
            'riasec_careers': self.riasec_careers,
            'model_info': {
                'version': '1.0',
                'total_questions': len(self.questions),
                'categories': list(set([q['category'] for q in self.questions])),
                'created_date': '2024-01-01T00:00:00'
            }
        }

# Initialize the model
try:
    quiz_model = CareerQuizModel(df)
    print(f"Model initialized with {len(quiz_model.questions)} questions")
    
    model_data = quiz_model.export_model_data()
    
    # Save to JSON file
    with open('career_quiz_model.json', 'w', encoding='utf-8') as f:
        json.dump(model_data, f, indent=2, ensure_ascii=False)
    
    print(f'Model exported successfully to career_quiz_model.json!')
    print(f'Total questions: {model_data["model_info"]["total_questions"]}')
    print(f'Categories: {model_data["model_info"]["categories"]}')
    
    # Verify file was created
    if os.path.exists('career_quiz_model.json'):
        file_size = os.path.getsize('career_quiz_model.json')
        print(f'File created successfully, size: {file_size} bytes')
    else:
        print('Error: File was not created!')
        
except Exception as e:
    print(f"Error creating model: {e}")
    import traceback
    traceback.print_exc()
