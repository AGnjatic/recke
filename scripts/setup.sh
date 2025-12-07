#!/bin/bash

echo "🚀 LinkedIn Puzzle Tracker - Setup Script"
echo "=========================================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << 'EOF'
# Database
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/linkedin_puzzle_tracker?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=""

# LinkedIn OAuth
LINKEDIN_CLIENT_ID=""
LINKEDIN_CLIENT_SECRET=""
EOF

    # Generate NEXTAUTH_SECRET
    if command -v openssl &> /dev/null; then
        SECRET=$(openssl rand -base64 32)
        # Use different sed syntax for macOS vs Linux
        if [[ "$OSTYPE" == "darwin"* ]]; then
            sed -i '' "s/NEXTAUTH_SECRET=\"\"/NEXTAUTH_SECRET=\"$SECRET\"/" .env
        else
            sed -i "s/NEXTAUTH_SECRET=\"\"/NEXTAUTH_SECRET=\"$SECRET\"/" .env
        fi
        echo "✅ Generated NEXTAUTH_SECRET"
    else
        echo "⚠️  Please install openssl to generate NEXTAUTH_SECRET"
    fi
    
    echo "⚠️  Please update .env with your database credentials and LinkedIn OAuth keys"
else
    echo "✅ .env file already exists"
fi

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🗄️  Setting up database..."
echo "Make sure PostgreSQL is running and database is created!"
read -p "Press enter to continue with database migration..."

npx prisma generate
npx prisma migrate dev --name init

echo ""
echo "✨ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update .env with your database credentials"
echo "2. Set up LinkedIn OAuth app at https://www.linkedin.com/developers/apps"
echo "3. Add LinkedIn credentials to .env"
echo "4. Run 'npm run dev' to start development server"
echo ""

