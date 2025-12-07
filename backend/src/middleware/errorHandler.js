import { ZodError } from 'zod';

/**
 * Global Error Handler Middleware
 */
export const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            error: 'Validation Error',
            details: err.errors.map(e => ({
                field: e.path.join('.'),
                message: e.message
            }))
        });
    }

    // Database errors
    if (err.code) {
        switch (err.code) {
            case '23505': // Unique violation
                return res.status(409).json({
                    success: false,
                    error: 'Duplicate Entry',
                    message: 'A record with this information already exists'
                });

            case '23503': // Foreign key violation
                return res.status(400).json({
                    success: false,
                    error: 'Invalid Reference',
                    message: 'Referenced record does not exist'
                });

            case '23502': // Not null violation
                return res.status(400).json({
                    success: false,
                    error: 'Missing Required Field',
                    message: 'A required field is missing'
                });
        }
    }

    // Custom application errors
    if (err.message === 'Agent not found') {
        return res.status(404).json({
            success: false,
            error: 'Not Found',
            message: err.message
        });
    }

    // Default server error
    res.status(err.status || 500).json({
        success: false,
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred'
    });
};

/**
 * 404 Not Found Handler
 */
export const notFoundHandler = (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Cannot ${req.method} ${req.path}`
    });
};
