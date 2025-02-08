[PUBLIC] Project Gutenberg Explorer
Overview
Project Gutenberg is a platform to download and access free e-books. We're looking to build a web application that allows users to explore and analyze books from Project Gutenberg.
PG Project Gutenberg Hamlet by William Shakespeare
Our project is to download books, display them and analyze the text using LLMs.
Deadline: 1 week from starting
API Access
E-book content and metadata can be programmatically fetched via Project Gutenberg
content_url = f"https://www.gutenberg.org/files/{book_id}/(book_id}-0.txt
metadata url = f"https://www.gutenberg.org/ebooks/{book_id)"

# Get book content

content response = requests.get (content url)
content = content_response. text

# Cot metadata

metadata_response = requests.get (metadata_url)
Requirements
Core Functionality

1. Input field for users to enter a Project Gutenberg book ID.
2. Fetch and display the book's text and metadata.
3. Save the book text and metadata for future access.
4. Provide a list view of all books the user has previously accessed.
   Text Analysis
   Given the text the user should be able to perform text analysis. You are free to choose what analysis you find most interesting but some could be:
   • Identify key characters
   • Language Detection
   • Sentiment Analysis
   • Plot Summary
   • Something else?
   / Styling
   Style it as you see fit. We personally really like tailwind and Shadcn.
   = Deliverables
   • Deploy the application to the internet
   • Integrate an LLM for text analysis (you have flexibility in choosing the specific model).
   • Store source code in Github
   • Create a loom that walks a user through the application and explains any technical choices
   Two very cool and free LLM providers are:
   9 Grog Grog is Fast Al Inference
   5 SambaNova Cloud
   You can create accounts w/o credit cards and they have fairly generous free tiers
