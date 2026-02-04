# Claude Skills for ShopTemplateSystem

This directory contains Claude Code skills that help with common tasks in the ShopTemplateSystem.

## Available Skills

### website-folder-structure

**Purpose**: Helps users create the complete DATABASE folder structure for a new B2B storefront website.

**When to use**:
- Setting up a new website from scratch
- Need guidance on the folder structure format
- Creating multiple products and collections efficiently
- Ensuring all required files are in place

**How to use**:
```bash
# In Claude Code, run:
/website-folder-structure
```

Or use any of these natural language phrases:
- "STS website"
- "Shuttle website"
- "website folder structure"
- "setup website"
- "create website"
- "build website folder"

The skill will automatically activate when you use any of these phrases.

**What it does**:
- Walks you through creating all required folders
- Gathers company info (name, colors, descriptions)
- Creates design configuration files
- Sets up collections and products with all details
- Validates the structure is correct
- Provides helpful defaults and suggestions

**Features**:
- Interactive step-by-step guidance
- Offers quick start templates
- Validates file formats and structure
- Provides troubleshooting help
- Suggests reasonable defaults

## How Skills Work

Skills are specialized prompts that guide Claude through specific workflows. When you invoke a skill:

1. Claude loads the skill instructions
2. Follows the defined process and guidelines
3. Uses the appropriate tools and patterns
4. Validates the work according to skill rules

## Creating New Skills

To add a new skill:

1. Create a `.md` file in this directory
2. Define the role, process, and guidelines
3. Include examples and common patterns
4. Add validation and error prevention rules
5. Update this README with the new skill

## Best Practices

- Use skills for repetitive, multi-step tasks
- Include clear validation steps
- Provide helpful defaults and suggestions
- Add troubleshooting guidance
- Keep instructions focused and actionable
