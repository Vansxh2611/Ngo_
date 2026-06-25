#!/usr/bin/env python3
import os
import sys
import datetime
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Preformatted, Table, TableStyle, Flowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.pdfgen import canvas

# Define directories and files to exclude
EXCLUDED_DIRS = {'.git', 'node_modules', '.next', '.vscode', 'public', 'scratch', 'venv'}
EXCLUDED_FILES = {
    'package-lock.json', 'tsconfig.tsbuildinfo', 
    'codebase_for_llm.pdf', 'codebase_for_llm.txt', 'codebase_for_llm.xml',
    'test.pdf', 'test.html', '.DS_Store'
}
EXCLUDED_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot', '.mp4', '.mp3'}

def get_codebase_files(root_dir):
    files_list = []
    for dirpath, dirnames, filenames in os.walk(root_dir):
        # Filter directories in-place to avoid traversing excluded ones
        dirnames[:] = [d for d in dirnames if d not in EXCLUDED_DIRS]
        for file in filenames:
            if file in EXCLUDED_FILES:
                continue
            ext = os.path.splitext(file)[1].lower()
            if ext in EXCLUDED_EXTENSIONS:
                continue
            rel_path = os.path.relpath(os.path.join(dirpath, file), root_dir)
            files_list.append(rel_path)
            
    # Sort files: root configuration files first, then directories
    files_list.sort(key=lambda x: (os.path.dirname(x) != '', x))
    return files_list

def generate_tree(codebase_files, ascii_only=False):
    tree = {}
    for path in codebase_files:
        parts = path.split(os.sep)
        curr = tree
        for part in parts:
            if part not in curr:
                curr[part] = {}
            curr = curr[part]
            
    lines = ['Dua_charitable_trust/']
    
    def walk_tree(node, prefix=''):
        keys = sorted(node.keys())
        for idx, key in enumerate(keys):
            is_last = (idx == len(keys) - 1)
            if ascii_only:
                connector = '\\-- ' if is_last else '|-- '
            else:
                connector = '└── ' if is_last else '├── '
                
            if node[key]:
                lines.append(f'{prefix}{connector}{key}')
                if ascii_only:
                    new_prefix = prefix + ('    ' if is_last else '|   ')
                else:
                    new_prefix = prefix + ('    ' if is_last else '│   ')
                walk_tree(node[key], new_prefix)
            else:
                lines.append(f'{prefix}{connector}{key}')
                
    walk_tree(tree)
    return '\n'.join(lines)

def wrap_line(line, max_len, pdf_mode=False):
    if len(line) <= max_len:
        return [line]
    
    indent = len(line) - len(line.lstrip())
    indent_str = " " * min(indent, max_len // 2)
    
    chunks = []
    chunks.append(line[:max_len])
    rest = line[max_len:]
    while rest:
        chunk_len = max_len - len(indent_str) - 4
        if chunk_len <= 10:
            chunk_len = 20
            indent_str = "  "
        chunk = rest[:chunk_len]
        bullet = "  -> " if pdf_mode else "  ↳ "
        chunks.append(indent_str + bullet + chunk)
        rest = rest[chunk_len:]
    return chunks

def format_code(content, max_len=95, pdf_mode=False):
    lines = content.splitlines()
    formatted = []
    pipe = " | " if pdf_mode else " │ "
    for i, line in enumerate(lines, 1):
        line_num = f"{i:4d}{pipe}"
        wrapped = wrap_line(line, max_len - 7, pdf_mode)
        for j, w_line in enumerate(wrapped):
            if j == 0:
                formatted.append(f"{line_num}{w_line}")
            else:
                indent_pipe = "     | " if pdf_mode else "     │ "
                formatted.append(indent_pipe + w_line)
    return "\n".join(formatted)

class BookmarkFlowable(Flowable):
    def __init__(self, title, key, level=0):
        super().__init__()
        self.title = title
        self.key = key
        self.level = level
        
    def wrap(self, availWidth, availHeight):
        return 0, 0
        
    def draw(self):
        self.canv.bookmarkPage(self.key)
        self.canv.addOutlineEntry(self.title, self.key, self.level, closed=True)

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []
        
    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()
        
    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            super().showPage()
        super().save()
        
    def draw_page_number(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748b")) # slate-500
        
        # Header (on all pages except the cover page)
        if self._pageNumber > 1:
            self.drawString(54, 750, "Dua Charitable Trust - Codebase Export")
            self.setStrokeColor(colors.HexColor("#e2e8f0")) # slate-200
            self.setLineWidth(0.5)
            self.line(54, 742, 558, 742)
            
        # Footer
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(558, 40, page_text)
        self.drawString(54, 40, "Confidential - For LLM / Developer Reference Only")
        self.setStrokeColor(colors.HexColor("#e2e8f0")) # slate-200
        self.setLineWidth(0.5)
        self.line(54, 52, 558, 52)
        
        self.restoreState()

def generate_pdf(root_dir, codebase_files, tree_text, pdf_path):
    # Set up document
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=72,
        bottomMargin=72
    )
    
    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=28,
        leading=34,
        textColor=colors.HexColor("#0f172a"),
        spaceAfter=10
    )
    
    subtitle_style = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=13,
        leading=16,
        textColor=colors.HexColor("#475569"),
        spaceAfter=30
    )
    
    metadata_style = ParagraphStyle(
        'CoverMetadata',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor("#64748b")
    )
    
    h1_style = ParagraphStyle(
        'DocH1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=colors.HexColor("#0f172a"),
        spaceBefore=15,
        spaceAfter=10,
        keepWithNext=True
    )
    
    h2_style = ParagraphStyle(
        'DocH2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=colors.HexColor("#1d4ed8"), # blue-700
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True
    )
    
    code_style = ParagraphStyle(
        'CodeStyle',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=7,
        leading=8.5,
        textColor=colors.HexColor("#1e293b")
    )
    
    tree_style = ParagraphStyle(
        'TreeStyle',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=7.5,
        leading=9.5,
        textColor=colors.HexColor("#0f172a")
    )
    
    story = []
    
    # 1. Cover Page
    story.append(Spacer(1, 150))
    story.append(Paragraph("Dua Charitable Trust", title_style))
    story.append(Paragraph("Codebase Compilation for LLM Analysis & Developer Reference", subtitle_style))
    
    # Calculate some stats
    total_files = len(codebase_files)
    total_lines = 0
    file_details = []
    
    for rel_path in codebase_files:
        full_path = os.path.join(root_dir, rel_path)
        try:
            with open(full_path, 'r', encoding='utf-8', errors='replace') as f:
                lines_count = len(f.readlines())
                total_lines += lines_count
                file_details.append((rel_path, lines_count))
        except Exception:
            file_details.append((rel_path, 0))
            
    date_str = datetime.datetime.now().strftime("%B %d, %Y at %I:%M %p")
    
    metadata_text = f"""
    <b>Generation Date:</b> {date_str}<br/>
    <b>Total Files:</b> {total_files}<br/>
    <b>Total Lines of Code:</b> {total_lines}<br/>
    <b>Scope:</b> Project Source & Configuration (excluding assets/builds)
    """
    story.append(Paragraph(metadata_text, metadata_style))
    story.append(PageBreak())
    
    # 2. Directory Tree
    story.append(BookmarkFlowable("Directory Tree", "dir_tree", level=0))
    story.append(Paragraph("Directory Tree", h1_style))
    story.append(Spacer(1, 5))
    story.append(Preformatted(tree_text, tree_style))
    story.append(PageBreak())
    
    # 3. File Contents
    story.append(BookmarkFlowable("File Contents", "file_contents", level=0))
    story.append(Paragraph("File Contents", h1_style))
    story.append(Spacer(1, 10))
    
    for rel_path, lines_count in file_details:
        full_path = os.path.join(root_dir, rel_path)
        
        # Add Bookmark and Heading
        anchor_name = rel_path.replace('/', '_').replace('.', '_').replace('[', '_').replace(']', '_')
        story.append(BookmarkFlowable(rel_path, anchor_name, level=1))
        story.append(Paragraph(f"File: {rel_path} ({lines_count} lines)", h2_style))
        
        try:
            with open(full_path, 'r', encoding='utf-8', errors='replace') as f:
                content = f.read()
            formatted = format_code(content, pdf_mode=True)
            story.append(Preformatted(formatted, code_style))
        except Exception as e:
            story.append(Preformatted(f"Error reading file: {str(e)}", code_style))
            
        story.append(Spacer(1, 15))
        
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF built successfully at {pdf_path}")

def main():
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    
    print(f"Scanning directory: {root_dir}")
    files = get_codebase_files(root_dir)
    print(f"Found {len(files)} files to compile.")
    
    tree_text = generate_tree(files)
    
    # 1. Generate codebase_for_llm.txt
    txt_path = os.path.join(root_dir, 'codebase_for_llm.txt')
    with open(txt_path, 'w', encoding='utf-8') as f:
        f.write("# Codebase for LLM Analysis\n\n")
        f.write("## Directory Tree\n")
        f.write("```\n")
        f.write(tree_text)
        f.write("\n```\n\n")
        f.write("## File Contents\n\n")
        
        for rel_path in files:
            f.write(f"### File: `{rel_path}`\n")
            f.write("```\n")
            full_path = os.path.join(root_dir, rel_path)
            try:
                with open(full_path, 'r', encoding='utf-8', errors='replace') as sf:
                    f.write(sf.read())
            except Exception as e:
                f.write(f"Error reading file: {str(e)}\n")
            f.write("\n```\n\n---\n\n")
    print(f"TXT file generated successfully at {txt_path}")
    
    # 2. Generate codebase_for_llm.xml
    xml_path = os.path.join(root_dir, 'codebase_for_llm.xml')
    with open(xml_path, 'w', encoding='utf-8') as f:
        f.write('<?xml version="1.0" encoding="utf-8"?>\n')
        f.write('<codebase>\n')
        f.write('  <structure><![CDATA[\n')
        f.write(tree_text)
        f.write('\n  ]]></structure>\n')
        
        for rel_path in files:
            safe_rel_path = rel_path.replace('"', '&quot;')
            f.write(f'  <file path="{safe_rel_path}">')
            full_path = os.path.join(root_dir, rel_path)
            try:
                with open(full_path, 'r', encoding='utf-8', errors='replace') as sf:
                    content = sf.read()
                # Escaping CDATA closing tags in case they exist inside files
                safe_content = content.replace("]]>", "]]]]><![CDATA[>")
                f.write('<![CDATA[\n')
                f.write(safe_content)
                f.write('\n]]>')
            except Exception as e:
                f.write(f'<![CDATA[Error reading file: {str(e)}]]>')
            f.write('</file>\n')
        f.write('</codebase>\n')
    print(f"XML file generated successfully at {xml_path}")
    
    # 3. Generate codebase_for_llm.pdf
    pdf_path = os.path.join(root_dir, 'codebase_for_llm.pdf')
    pdf_tree_text = generate_tree(files, ascii_only=True)
    generate_pdf(root_dir, files, pdf_tree_text, pdf_path)
    
if __name__ == '__main__':
    main()
