"use client";

import { useState, useEffect } from "react";
import { Upload, File, Trash2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";

interface Document {
  _id: string;
  name: string;
  type: string;
  url: string;
  size: number;
  createdAt: string;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/documents');
      if (!response.ok) throw new Error('Erreur lors du chargement');
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      toast.error("Erreur lors du chargement des documents");
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/documents', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Erreur lors du téléchargement');
      
      const newDocument = await response.json();
      setDocuments(prev => [newDocument, ...prev]);
      toast.success('Document téléchargé avec succès');
    } catch (error) {
      toast.error("Erreur lors du téléchargement du document");
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
        <div className="relative">
          <Input 
            type="file"
            onChange={handleUpload}
            disabled={isUploading}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className={`inline-flex items-center px-4 py-2 rounded-md bg-primary text-white cursor-pointer ${
              isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90'
            }`}
          >
            <Upload className="w-4 h-4 mr-2" />
            {isUploading ? 'Téléchargement...' : 'Télécharger un document'}
          </label>
        </div>
      </div>

      <div className="space-y-4">
        {documents.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <File className="w-12 h-12 mx-auto text-gray-400" />
            <p className="mt-2 text-gray-600">Aucun document</p>
          </div>
        ) : (
          documents.map((doc) => (
            <div
              key={doc._id}
              className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <File className="w-8 h-8 text-gray-400" />
                <div>
                  <h3 className="font-medium text-gray-900">{doc.name}</h3>
                  <p className="text-sm text-gray-500">
                    {formatFileSize(doc.size)} • {new Date(doc.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(doc.url, '_blank')}
                >
                  <Download className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={async () => {
                    try {
                      const response = await fetch(`/api/documents/${doc._id}`, {
                        method: 'DELETE',
                      });
                      if (!response.ok) throw new Error('Erreur lors de la suppression');
                      setDocuments(docs => docs.filter(d => d._id !== doc._id));
                      toast.success('Document supprimé');
                    } catch (error) {
                      toast.error('Erreur lors de la suppression');
                    }
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}