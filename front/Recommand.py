import pandas as pd
from surprise import Dataset, Reader, SVD, accuracy
from surprise.model_selection import train_test_split

# Sample data
data = {
    'user_id',
    'music_id',
}

# Convert to DataFrame
df = pd.DataFrame(data)

# Load data into Surprise dataset
reader = Reader(music=(1, 5))
data = Dataset.load_from_df(df[['user_id', 'music_id', 'music']], reader)

# Split data into training and test sets
trainset, testset = train_test_split(data, test_size=0.2)

# Build and train the SVD model
model = SVD()
model.fit(trainset)

# Make predictions
predictions = model.test(testset)

# Evaluate the model
accuracy.rmse(predictions)

# Function to get recommendations for a specific user
def get_top_n(predictions, n=10):
    top_n = {}
    
    for uid, iid, true_r, est, _ in predictions:
        if not top_n.get(uid):
            top_n[uid] = []
        top_n[uid].append((iid, est))
    
   

# Get top recommendations for each user
top_n_recommendations = get_top_n(predictions, n=3)

# Display recommendations
for uid, music in top_n_recommendations.items():
    print(f"User {uid} recommendations:")
    # for iid, rating in user_ratings:
    #     print(f"  Music {iid} with predicted rating {rating:.2f}")
